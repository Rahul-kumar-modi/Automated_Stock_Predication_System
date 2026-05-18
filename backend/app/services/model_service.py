import os
from stable_baselines3 import A2C


class ModelService:

    MODEL_PATH = "app/models/trained_a2c.zip"

    @staticmethod
    def save_model(model):
        model.save(ModelService.MODEL_PATH)

    @staticmethod
    def model_exists():
        return os.path.exists(ModelService.MODEL_PATH)

    @staticmethod
    def load_model():

        if not os.path.exists(ModelService.MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found at {ModelService.MODEL_PATH}"
            )

        model = A2C.load(ModelService.MODEL_PATH)

        return model