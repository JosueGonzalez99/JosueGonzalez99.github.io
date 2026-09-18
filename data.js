const TRANSPORT_DATA = {
  "costs": {
    "F1": {
      "D1": 44,
      "D2": 54,
      "D3": 54,
      "D4": 49,
      "D5": 49,
      "D6": 62
    },
    "F2": {
      "D1": 49,
      "D2": 54,
      "D3": 54,
      "D4": 54,
      "D5": 49,
      "D6": 62
    },
    "F3": {
      "D1": 44,
      "D2": 54,
      "D3": 54,
      "D4": 54,
      "D5": 49,
      "D6": 62
    },
    "F4": {
      "D1": 54,
      "D2": 62,
      "D3": 44,
      "D4": 49,
      "D5": 54,
      "D6": 62
    },
    "F5": {
      "D1": 54,
      "D2": 49,
      "D3": 62,
      "D4": 62,
      "D5": 54,
      "D6": 54
    }
  },
  "supply": {
    "F1": 650,
    "F2": 500,
    "F3": 700,
    "F4": 550,
    "F5": 600
  },
  "demand": {
    "D1": 400,
    "D2": 550,
    "D3": 450,
    "D4": 500,
    "D5": 600,
    "D6": 500
  },
  "noroeste": {
    "steps": [
      {
        "f": "F1",
        "d": "D1",
        "amt": 400,
        "cost": 44,
        "supply_after": 250,
        "demand_after": 0
      },
      {
        "f": "F1",
        "d": "D2",
        "amt": 250,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 300
      },
      {
        "f": "F2",
        "d": "D2",
        "amt": 300,
        "cost": 54,
        "supply_after": 200,
        "demand_after": 0
      },
      {
        "f": "F2",
        "d": "D3",
        "amt": 200,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 250
      },
      {
        "f": "F3",
        "d": "D3",
        "amt": 250,
        "cost": 54,
        "supply_after": 450,
        "demand_after": 0
      },
      {
        "f": "F3",
        "d": "D4",
        "amt": 450,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 50
      },
      {
        "f": "F4",
        "d": "D4",
        "amt": 50,
        "cost": 49,
        "supply_after": 500,
        "demand_after": 0
      },
      {
        "f": "F4",
        "d": "D5",
        "amt": 500,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 100
      },
      {
        "f": "F5",
        "d": "D5",
        "amt": 100,
        "cost": 54,
        "supply_after": 500,
        "demand_after": 0
      },
      {
        "f": "F5",
        "d": "D6",
        "amt": 500,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 0
      }
    ],
    "total": 157750
  },
  "costo_minimo": {
    "steps": [
      {
        "f": "F1",
        "d": "D1",
        "amt": 400,
        "cost": 44,
        "supply_after": 250,
        "demand_after": 0
      },
      {
        "f": "F4",
        "d": "D3",
        "amt": 450,
        "cost": 44,
        "supply_after": 100,
        "demand_after": 0
      },
      {
        "f": "F1",
        "d": "D4",
        "amt": 250,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 250
      },
      {
        "f": "F2",
        "d": "D5",
        "amt": 500,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 100
      },
      {
        "f": "F3",
        "d": "D5",
        "amt": 100,
        "cost": 49,
        "supply_after": 600,
        "demand_after": 0
      },
      {
        "f": "F4",
        "d": "D4",
        "amt": 100,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 150
      },
      {
        "f": "F5",
        "d": "D2",
        "amt": 550,
        "cost": 49,
        "supply_after": 50,
        "demand_after": 0
      },
      {
        "f": "F3",
        "d": "D4",
        "amt": 150,
        "cost": 54,
        "supply_after": 450,
        "demand_after": 0
      },
      {
        "f": "F5",
        "d": "D6",
        "amt": 50,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 450
      },
      {
        "f": "F3",
        "d": "D6",
        "amt": 450,
        "cost": 62,
        "supply_after": 0,
        "demand_after": 0
      }
    ],
    "total": 149600
  },
  "vogel": {
    "steps": [
      {
        "f": "F4",
        "d": "D3",
        "amt": 450,
        "cost": 44,
        "supply_after": 100,
        "demand_after": 0
      },
      {
        "f": "F5",
        "d": "D6",
        "amt": 500,
        "cost": 54,
        "supply_after": 100,
        "demand_after": 0
      },
      {
        "f": "F1",
        "d": "D1",
        "amt": 400,
        "cost": 44,
        "supply_after": 250,
        "demand_after": 0
      },
      {
        "f": "F2",
        "d": "D5",
        "amt": 500,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 100
      },
      {
        "f": "F3",
        "d": "D5",
        "amt": 100,
        "cost": 49,
        "supply_after": 600,
        "demand_after": 0
      },
      {
        "f": "F4",
        "d": "D4",
        "amt": 100,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 400
      },
      {
        "f": "F5",
        "d": "D2",
        "amt": 100,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 450
      },
      {
        "f": "F1",
        "d": "D4",
        "amt": 250,
        "cost": 49,
        "supply_after": 0,
        "demand_after": 150
      },
      {
        "f": "F3",
        "d": "D4",
        "amt": 150,
        "cost": 54,
        "supply_after": 450,
        "demand_after": 0
      },
      {
        "f": "F3",
        "d": "D2",
        "amt": 450,
        "cost": 54,
        "supply_after": 0,
        "demand_after": 0
      }
    ],
    "total": 148250
  }
};
