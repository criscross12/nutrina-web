import { useEffect } from "react";
import { Textarea } from "@nextui-org/react";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { datahelp, dataUpdate } from "../../utils/index";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../context/dataContext";
import { NUTRINA_API } from "../../utils/config";
import Image from "next/image";

const posts = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  //ComponentDid
  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);
  //
  const { push, query } = useRouter();

  //Condición dependiendo de tipo de uso del form
  if (query.type && query.type == "updateData") {
    console.log("Pantalla de distribución energetica");
    const [datas, setData] = useState([]);
    const getDataConsultation = async () => {
      const { data: res } = await axios.get(
        NUTRINA_API.apiNutrina + "/medical-consultation/One/" + query.id,
        {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        }
      );
      setData(res);
    };
    useEffect(() => {
      getDataConsultation();
    }, []);

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({ mode: "all" });

    /** Input field component */
    const Input = ({ name, label, required, step, type, placeholder }) => (
      <div>
        <legend>{label}</legend>
        <input
          name={name}
          {...register(name, { required })}
          step={step}
          className={errors[label] && styles.inputInvalid}
          type={type}
          placeholder={placeholder}
        />
        {errors[label] && <span>Requerido</span>}
      </div>
    );

    const InputData = ({ name, label, value, step }) => (
      <div>
        <legend>{label}</legend>
        <input
          name={name}
          step={step}
          value={value}
          className={errors[label] && styles.inputInvalid}
          type="text"
          disabled
        />
        {errors[label] && <span>Requerido</span>}
      </div>
    );

    /** Nnavigation between steps */
    const rightArrow =
      "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345";
    const leftArrow =
      "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363";

    /** Mark the input group already filled as blue or gray if not */

    const [stepUpdate, setStepUpdate] = useState(0);
    const NavigationUpdate = () => (
      <section className={styles.navigationControls}>
        {stepUpdate === fieldGroupsR.length - 1 && (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isValid}
          >
            SAVE
          </button>
        )}
        {stepUpdate < fieldGroupsR.length - 1 && (
          <button
            type="button"
            className={styles.nextButton}
            //disabled={!isValid}
            onClick={() => {
              setStepUpdate(stepUpdate + 1);
            }}
          >
            <img src={rightArrow} alt="description of image" />
            Siguiente
          </button>
        )}
        {stepUpdate > 0 && (
          <button
            type="button"
            className={styles.backButton}
            onClick={() => {
              setStepUpdate(stepUpdate - 1);
            }}
          >
            <img src={leftArrow} alt="description of image" />
            Atrás
          </button>
        )}
      </section>
    );

    /** Mark the input group already filled as blue or gray if not */
    const Reference = () => (
      <footer className={styles.reference}>{renderMarkers()}</footer>
    );
    function renderMarkers() {
      let markers = [];
      for (let i = 0; i < fieldGroupsR.length; i++)
        markers.push(
          <span
            className={stepUpdate >= i ? styles.markerBlue : styles.markerGray}
          />
        );
      return markers;
    }

    const fieldGroupsData = [
      <InputData
        value={datas["fao_who_onu"]}
        label="Fao Who Onu:"
        name="fao_who_onu"
      />,
      <InputData
        name="harris_benedict"
        value={datas["harris_benedict"]}
        label="Harris Benedict:"
      />,
      <InputData value={datas["valencia"]} name="valencia" label="Valencia:" />,
      <InputData
        value={datas["mifflin_st"]}
        name="mifflin_st"
        label="Mifflin-St. Jeor:"
      />,
      <InputData value={datas["average"]} name="average" label="Promedio:" />,
    ];
    const DistributionFields = () => (
      <section className={styles.inputGroup}>
        <h3>Distribución energética</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
          {fieldGroupsData}
        </div>
        <div className="">
          <Input
            name="kcalCarboHydrates"
            label="Porcentaje para hidratos de carbono:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="kcalLipids"
            label="Porcentaje para lípidos:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="kcalProteins"
            label="Porcentaje para proteínas:"
            required
            type="number"
            placeholder="##"
          />
        </div>
      </section>
    );

    const NotesFields = () => (
      <section className={styles.inputGroup}>
        <h3>Notas generales</h3>
        <div className="">
          <br />
          <br />
          <br />
          <Textarea
            {...register("note")}
            rows="5"
            cols="150"
            bordered
            color="primary"
            labelPlaceholder="Agregar notas"
          />
        </div>
      </section>
    );

    let fieldGroupsR = [<DistributionFields />, <NotesFields />];

    const onSubmit = async (data) => {
      //TODO validar si la consulta es nueva o de seguimiento.
      const dataSend = dataUpdate(data);
      const updateRes = await fetch(
        NUTRINA_API.apiNutrina + "/medical-consultation/update/" + query.id,
        {
          method: "PUT",
          body: JSON.stringify(dataSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentUser,
          },
        }
      );
      if (updateRes.status == 200) {
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Datos de distribución energética registrados!!",
          showConfirmButton: true,
          timer: 1500,
        });
        push("/admin/patients");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
        });
      }
    };

    return (
      <Layout title={"Consulta"}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b border-black grid grid-cols-3">
            <div>
              <h1 className="text-2xl font-bold mb-4">
                Registro de Distribución energética
              </h1>
            </div>
            <div>{""}</div>
            <div className="md:top-0 absolute right-8 sm:top-10">
              <Image src="/nutrina1.png" width={150} height={80} />
            </div>
          </div>
          {fieldGroupsR[stepUpdate]}
          <NavigationUpdate />
          <Reference />
        </form>
      </Layout>
    );
  } else {
    console.log("Pantalla de registro y seguimiento");

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({ mode: "all" });

    const onSubmit = async (data) => {
      //TODO validar si la consulta es nueva o de seguimiento.
      const dataSend = datahelp(data);
      if (query.id) dataSend.patient_uuid = query.id;
      const response = await fetch(
        NUTRINA_API.apiNutrina + "/medical-consultation/medical-consultation",
        {
          method: "POST",
          body: JSON.stringify(dataSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentUser,
          },
        }
      );
      if (response.status == 200) {
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Consulta exitosa!!",
          showConfirmButton: true,
          timer: 1500,
        });
        push("/admin/patients");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
        });
      }
    };

    /** Input field component */
    const Input = ({ name, label, required, step, type, placeholder }) => (
      <div>
        <legend>{label}</legend>
        <input
          name={name}
          {...register(name, { required })}
          step={step}
          className={errors[label] && styles.inputInvalid}
          type={type}
          placeholder={placeholder}
        />
        {errors[label] && <span>Requerido</span>}
      </div>
    );

    /** Group the person input fields in a component */
    const PersonFields = () => (
      <section className={styles.inputGroup}>
        <h3>Datos Generales del paciente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
          <Input
            name="name"
            label="Nombre (s):"
            required
            type="text"
            placeholder="Ejem: Maria"
          />
          <Input
            name="first_name"
            label="Apellido Paterno:"
            required
            type="text"
            placeholder="Ejem: Aguilar"
          />
          <Input
            name="second_name"
            label="Apellido Materno:"
            required
            type="text"
            placeholder="Ejem: Nava"
          />
          <Input
            name="date_of_birth"
            label="Fecha de Nacimiento:"
            required
            type="date"
            placeholder="dd/mm/aaa"
          />
          {/*TODO HTML input email ??  */}
          <Input
            name="email"
            label="Email:"
            type="email"
            placeholder="Ejem: user@gmail.com"
          />
          <Input
            name="ocupation"
            label="Ocupación:"
            required
            type="text"
            placeholder="Ejem: Docente"
          />
          <Input
            name="phone"
            label="Número telefónico:"
            required
            type="text"
            placeholder="Ejem: 7131008956"
          />
          <Input
            name="reason"
            label="Motivo de la consulta:"
            required
            type="text"
            placeholder="Ejem: *******"
          />
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("sex", { required: true })}
          >
            <option value="">Sexo...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </section>
    );

    /** Group the contact input fields in a component */
    const ContactFields = () => (
      <section className={styles.inputGroup}>
        <h3>Mediciones básicas</h3>
        <Input
          name="weight"
          label="Peso:"
          required
          type="number"
          placeholder="60kg"
        />
        <Input
          name="height"
          label="Estatura:"
          required
          type="number"
          placeholder="160cm"
        />
        <Input
          name="waist"
          label="Cintura:"
          required
          type="number"
          placeholder="45cm"
        />
        <Input
          name="hip"
          label="Cadera:"
          required
          type="number"
          placeholder="55cm"
        />
      </section>
    );

    /** Group the address input fields in a component */
    const AddressFields = () => (
      <section className={styles.inputGroup}>
        <h3>Composición corporal</h3>
        <Input
          name="fat_percentage"
          label="% grasa corporal:"
          required
          type="number"
          placeholder="##"
        />
        <Input
          name="visceral_fat_percentage"
          label="% grasa visceral:"
          required
          type="number"
          placeholder="##"
        />
        <Input
          name="muscle_mass_percentage"
          label="% masa muscular:"
          required
          type="number"
          placeholder="##"
        />
        <Input
          name="body_age"
          label="Edad corporal"
          required
          type="number"
          placeholder="##"
        />
      </section>
    );

    /** Group the vital sings input fields in a component */
    const VitalSignsFields = () => (
      <section className={styles.inputGroup}>
        <h3>Signos vitales</h3>
        <Input
          name="capillary_glucose"
          label="Glucosa Capilar:"
          required
          type="number"
          placeholder="##"
        />
        <Input
          name="heart_rate"
          label="Frecuencia Cardiaca:"
          required
          type="number"
          placeholder="##"
        />
        <Input
          name="blood_pressure"
          label="Tensión arterial"
          required
          type="text"
          placeholder="24/100"
        />
      </section>
    );

    /** Group the vital sings input fields in a component */
    const PlyometricFields = () => (
      <section className={styles.inputGroup}>
        <h3>Mediciones plicometricas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
          <Input
            name="pl_triceps"
            label="Pl Triceps:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_subscapular"
            label="Pl Subescapular:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_biceps"
            label="Pl Biceps:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_iliac_crest"
            label="Pl Cresta iliaca:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_supraspinal"
            label="Pl Supraespinal:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_abdominal"
            label="Pl Abdominal:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_thigh"
            label="Pl Muslo:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="pl_leg"
            label="Pl Pierna:"
            required
            type="number"
            placeholder="##"
          />
        </div>
      </section>
    );

    const BoneDiametersFields = () => (
      <section className={styles.inputGroup}>
        <h3>Diametros óseos</h3>
        <div className="">
          <Input
            name="D_bistyloid"
            label="D.Biestiloideo :"
            required
            step="any"
            type="number"
            placeholder="##"
          />
          <Input
            name="D_humerus"
            label="D.Húmero:"
            required
            step="any"
            type="number"
            placeholder="##"
          />
          <Input
            name="D_femur"
            label="D.Fémur:"
            required
            step="any"
            type="number"
            placeholder="##"
          />
        </div>
      </section>
    );

    const CircumferencesFields = () => (
      <section className={styles.inputGroup}>
        <h3>Circunferencias</h3>
        <div className="">
          <Input
            name="c_relaxed_arm"
            label="Brazo Relajado:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="c_contracted_arm"
            label="Brazo Contraido:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="c_leg_max"
            label="Pierna Máxima:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="c_mid_thigh"
            label="Muslo medio:"
            required
            type="number"
            placeholder="##"
          />
          <Input
            name="cmb"
            label="Circunferencia media de brazo:"
            required
            type="number"
            placeholder="45 (cm)"
          />
        </div>
      </section>
    );

    /** Nnavigation between steps */
    const rightArrow =
      "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345";
    const leftArrow =
      "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363";

    const Navigation = () => (
      <section className={styles.navigationControls}>
        {step === fieldGroups.length - 1 && (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isValid}
          >
            SAVE
          </button>
        )}
        {step < fieldGroups.length - 1 && (
          <button
            type="button"
            className={styles.nextButton}
            //disabled={!isValid}
            onClick={() => {
              setStep(step + 1);
            }}
          >
            <img src={rightArrow} alt="description of image" />
            Siguiente
          </button>
        )}
        {step > 0 && (
          <button
            type="button"
            className={styles.backButton}
            onClick={() => {
              setStep(step - 1);
            }}
          >
            <img src={leftArrow} alt="description of image" />
            Atrás
          </button>
        )}
      </section>
    );

    /** Mark the input group already filled as blue or gray if not */
    const Reference = () => (
      <footer className={styles.reference}>{renderMarkers()}</footer>
    );
    function renderMarkers() {
      let markers = [];
      for (let i = 0; i < fieldGroups.length; i++)
        markers.push(
          <span className={step >= i ? styles.markerBlue : styles.markerGray} />
        );
      return markers;
    }

    const [step, setStep] = useState(0);

    let fieldGroups = [];
    if (query.id && query.type == null) {
      fieldGroups = [
        <ContactFields />,
        <AddressFields />,
        <VitalSignsFields />,
        <PlyometricFields />,
        <CircumferencesFields />,
        <BoneDiametersFields />,
      ];
    } else {
      fieldGroups = [
        <PersonFields />,
        <ContactFields />,
        <AddressFields />,
        <VitalSignsFields />,
        <PlyometricFields />,
        <CircumferencesFields />,
        <BoneDiametersFields />,
      ];
    }

    return (
      <Layout title={"Consulta"}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b border-black grid grid-cols-3">
            <div>
              <h1 className="text-2xl font-bold mb-4">
                {query.id ? "Seguimiento de paciente" : "Registro de Pacientes"}
              </h1>
            </div>
            <div>{""}</div>
            <div className="md:top-0 absolute right-8 sm:top-10">
              <Image src="/nutrina1.png" width={150} height={80} />
            </div>
          </div>
          {fieldGroups[step]}
          <Navigation />
          <Reference />
        </form>
      </Layout>
    );
  }
};

export default posts;
