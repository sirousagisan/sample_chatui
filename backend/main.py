import uvicorn
from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from api import get_res

app = FastAPI()
origins = ['http://localhost:5173', "http://127.0.0.1:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def get_responce(question: dict):
    return StreamingResponse(get_res(text=question["text"]))

@app.post("/ok")
async def get_hello(text: dict):
    return {"res": "Hello"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8080, reload=True)