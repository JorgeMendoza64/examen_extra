from sqlmodel import SQLModel, create_engine
from models import *

DATABASE_URL = "sqlite:///./pacientes.db"

engine = create_engine(DATABASE_URL, echo=True)

def inicializar_bd():
    SQLModel.metadata.create_all(engine)