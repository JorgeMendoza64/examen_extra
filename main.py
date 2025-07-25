from fastapi import (FastAPI, HTTPException, status,
                    Request, Query)
from database import engine, inicializar_bd
from sqlmodel import Session, select
from models import Paciente
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

inicializar_bd()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/frontend", StaticFiles(directory="frontend", html=True), name="frontend")

@app.get("/")
def read_root():
    return {"Hello": "Hello World"}

@app.get("/pacientes/{numero_paciente}", response_model=Paciente)
def leer_paciente(numero_paciente:str):
    with Session(engine) as session:
        paciente = session.get(Paciente, numero_paciente)
        if not paciente:
            raise HTTPException(status_code=404, detail="El paciente no fue encontrado")
        return paciente

@app.get("/pacientes", response_model=list[Paciente])
def obtener_pacientes():
    with Session(engine) as session:
        query = select(Paciente)
        resultados = session.exec(query).all()
        return resultados

@app.post("/pacientes", response_model=Paciente, 
          status_code=status.HTTP_201_CREATED)
def crear_paciente(paciente:Paciente):
    with Session(engine) as session:
        session.add(paciente)
        session.commit()
        session.refresh(paciente)
        return paciente

@app.delete("/pacientes/{numero_paciente}", 
            status_code=status.HTTP_204_NO_CONTENT)
def eliminar_paciente(numero_paciente:str):
    with Session(engine) as session:
        paciente = session.get(Paciente, numero_paciente)
        if not paciente:
            raise HTTPException(status_code=404, 
                                detail="El paciente no fue encontrado")
        session.delete(paciente)
        session.commit()