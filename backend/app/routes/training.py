from fastapi import APIRouter
import time

router = APIRouter(prefix="/training", tags=["Training"])

training_status = {
    "status": "idle",
    "progress": 0
}


@router.post("/start")
def start_training():
    training_status["status"] = "training"

    for i in range(1, 101):
        training_status["progress"] = i
        time.sleep(0.01)

    training_status["status"] = "completed"

    return {
        "message": "Training Completed"
    }


@router.get("/status")
def get_training_status():
    return training_status