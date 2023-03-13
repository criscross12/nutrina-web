export const datahelp = (data) => {
  const user_uuid = "";
  const patient_uuid = "";
  const note = data["note"];

  let data_patient = {};
  if (data["email"] == "") {
    data_patient = {
      name: data["name"],
      first_name: data["first_name"],
      second_name: data["second_name"],
      date_of_birth: data["date_of_birth"],
      ocupation: data["ocupation"],
      phone: data["phone"],
      reason: data["reason"],
      sex: data["sex"],
    };
  } else {
    data_patient = {
      name: data["name"],
      first_name: data["first_name"],
      second_name: data["second_name"],
      date_of_birth: data["date_of_birth"],
      email: data["email"],
      ocupation: data["ocupation"],
      phone: data["phone"],
      reason: data["reason"],
      sex: data["sex"],
    };
  }

  const basic_measurements = {
    weight: parseFloat(data["weight"]),
    height: parseFloat(data["height"]),
    waist: parseFloat(data["waist"]),
    hip: parseFloat(data["hip"]),
  };
  const body_measurements = {
    fat_percentage: parseFloat(data["fat_percentage"]),
    visceral_fat_percentage: parseFloat(data["visceral_fat_percentage"]),
    muscle_mass_percentage: parseFloat(data["muscle_mass_percentage"]),
    body_age: parseFloat(data["body_age"]),
  };
  const vital_signs = {
    capillary_glucose: parseFloat(data["capillary_glucose"]),
    heart_rate: parseFloat(data["heart_rate"]),
    blood_pressure: data["blood_pressure"],
  };
  const plyometric_measurements = {
    pl_triceps: parseFloat(data["pl_triceps"]),
    pl_subscapular: parseFloat(data["pl_subscapular"]),
    pl_biceps: parseFloat(data["pl_biceps"]),
    pl_iliac_crest: parseFloat(data["pl_iliac_crest"]),
    pl_supraspinal: parseFloat(data["pl_supraspinal"]),
    pl_abdominal: parseFloat(data["pl_abdominal"]),
    pl_thigh: parseFloat(data["pl_thigh"]),
    pl_leg: parseFloat(data["pl_leg"]),
  };
  const bone_diameters = {
    D_bistyloid: parseFloat(data["D_bistyloid"]),
    D_humerus: parseFloat(data["D_humerus"]),
    D_femur: parseFloat(data["D_femur"]),
  };
  const circumferences = {
    c_relaxed_arm: parseFloat(data["c_relaxed_arm"]),
    c_contracted_arm: parseFloat(data["c_contracted_arm"]),
    c_leg_max: parseFloat(data["c_leg_max"]),
    c_mid_thigh: parseFloat(data["c_mid_thigh"]),
    cmb: parseFloat(data["cmb"]),
  };
  const energy_distribution = {
    kcalCarboHydrates: parseFloat(data["kcalCarboHydrates"]),
    kcalLipids: parseFloat(data["kcalLipids"]),
    kcalProteins: parseFloat(data["kcalProteins"]),
  };

  const dataResponse = {
    user_uuid,
    patient_uuid,
    data_patient,
    basic_measurements,
    body_measurements,
    vital_signs,
    bone_diameters,
    circumferences,
    energy_distribution,
    plyometric_measurements,
    note,
  };
  return dataResponse;
};

export const dataUpdate = (data) => {
  const note = data["note"];

  const energy_distribution = {
    kcalCarboHydrates: parseFloat(data["kcalCarboHydrates"]),
    kcalLipids: parseFloat(data["kcalLipids"]),
    kcalProteins: parseFloat(data["kcalProteins"]),
  };

  const dataResponse = {
    energy_distribution,
    note,
  };
  return dataResponse;
};
