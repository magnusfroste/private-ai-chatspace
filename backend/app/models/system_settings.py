from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from app.core.database import Base


class SystemSettings(Base):
    """System-wide settings that override .env defaults.
    
    Uses a key-value pattern for flexibility.
    Admin can modify these via UI without touching .env.
    """
    __tablename__ = "system_settings"
    
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, nullable=False, index=True)
    value = Column(String, nullable=True)
    value_type = Column(String, default="string")  # string, int, float, bool
    description = Column(String, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    @property
    def typed_value(self):
        """Return value converted to its proper type."""
        if self.value is None:
            return None
        if self.value_type == "int":
            return int(self.value)
        elif self.value_type == "float":
            return float(self.value)
        elif self.value_type == "bool":
            return self.value.lower() in ("true", "1", "yes")
        return self.value
