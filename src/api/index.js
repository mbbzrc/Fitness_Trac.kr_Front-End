export const BASE_URL = "https://fitness-trackr-usd-2103.herokuapp.com";

function createHeaders() {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllActivities() {
  try {
    const response = await fetch(`${BASE_URL}/api/activities`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createActivity(name, description) {
  try {
    const response = await fetch(`${BASE_URL}/api/activities`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteActivity(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/activities/${id}`, {
      method: "DELETE",
      headers: createHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {}
}

export async function fetchAllPublicRoutines() {
  try {
    const response = await fetch(`${BASE_URL}/api/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRoutinesByUser(username) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines/user/${username}`, {
      method: "GET",
      headers: createHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createRoutine(name, goal, isPublic) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateRoutine(name, goal, isPublic, id) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines/${id}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        name: name ? name : null,
        goal: goal ? goal : null,
        isPublic: isPublic !== undefined ? isPublic : null,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addActivityToRoutine(
  routineId,
  activityId,
  count,
  duration
) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRoutine(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/routines/${id}`, {
      method: "DELETE",
      headers: createHeaders(),
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRoutineActivitiesByRoutineId(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/routine_activities/${id}`, {
      method: "GET",
      headers: createHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRoutineActivity(routineActivityId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: createHeaders(),
      }
    );
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
