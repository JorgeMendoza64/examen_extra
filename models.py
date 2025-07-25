from sqlmodel import SQLModel, Field

class Paciente(SQLModel, table=True):
    numero_paciente:str = Field(default=None, primary_key=True)
    nombre:str
    apellidos:str
    fecha_cita:str
    tipo_cita:str
    costo:str
    proxima_cita:str