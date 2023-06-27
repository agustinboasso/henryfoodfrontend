import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, getDiets } from '../../redux/actions';
import styles from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const dietOptions = useSelector((state) => state.dietOptions);

  const [form, setForm] = useState({
    name: '',
    summary: '',
    healthScore: '',
    stepByStep: '',
    image: '',
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedDiets = selectedOptions.map((option) => option.value);
    setForm({ ...form, diets: selectedDiets });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      alert('El nombre solo debe contener letras y espacios, sin números ni símbolos');
      return;
    }

    if (form.summary.trim().split(' ').length < 2) {
      alert('El resumen debe tener al menos dos palabras');
      return;
    }

    const healthScore = parseInt(form.healthScore);
    if (isNaN(healthScore) || healthScore < 1 || healthScore > 100) {
      alert('El healthScore debe ser un número entre 1 y 100');
      return;
    }

    if (form.stepByStep.trim().split(' ').length < 2) {
      alert('Los pasos deben tener al menos dos palabras');
      return;
    }
    console.log(form)
    try {
      dispatch(addRecipe(form));
      setForm({
        name: '',
        summary: '',
        healthScore: '',
        stepByStep: '',
        image: '',
        diets: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles['form-wrapper']}>
      <form className={styles['form-container']} onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={form.name} onChange={handleChange} name="name" />
        </label>
        <br />
        <label>
          Summary:
          <input type="text" value={form.summary} onChange={handleChange} name="summary" />
        </label>
        <br />
        <label>
          URL Image:
          <input type="text" value={form.image} onChange={handleChange} name="image" />
        </label>
        <br />
        <label>
          Health Score:
          <input type="number" value={form.healthScore} onChange={handleChange} name="healthScore" />
        </label>
        <br />
        <label>
          Diets:
          <div className={styles['select-container']}>
            <Select
              isMulti
              options={dietOptions.map((diet) => ({ value: diet.name, label: diet.name }))}
              onChange={handleSelectChange}
            />
          </div>
        </label>
        <br />
        <label>
          Steps:
          <textarea value={form.stepByStep} onChange={handleChange} name="stepByStep"></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;


