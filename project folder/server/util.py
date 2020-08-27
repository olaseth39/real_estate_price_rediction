import json
import pickle
import numpy as np

# create variables
locations = ""
data_columns = ""
model = ""


def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = data_columns.index(location.lower())

    except:
        loc_index = -1

    x = np.zeros(len(data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index == 0:
        x[loc_index] = 1

    return round(model.predict([x])[0], 2)


def get_location_names():
    return locations


def get_load_saved_artifacts():
    print("Loading saved artifacts...start")
    global data_columns
    global locations
    global model

    with open("./artifacts/columns.json", "r") as f:
        data_columns = json.load(f)['data_columns']
        locations = data_columns[3:]

    with open("./artifacts/bangalore_home_price_s_model.pickle", "rb") as f:
        model = pickle.load(f)
    print("loading saved artifacts...done")


if __name__ == "__main__":
    get_load_saved_artifacts()
    print(get_location_names())
    # print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    # print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    # print(get_estimated_price('kalhalli', 1000, 2, 2))

