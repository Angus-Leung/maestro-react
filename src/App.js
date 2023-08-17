import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DynamicForm from './pages/DynamicForm'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import WarningIcon from '@mui/icons-material/Warning';
import Tooltip from '@mui/material/Tooltip';
import styles from './App.module.scss'
import testTemplate3 from './testTemplate3.json';
import testTemplate4 from './testTemplate4.json';
import testData from './testData.json';
import { createContext } from 'react';
export const FormContext = createContext(null);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00e36b',
    },
    secondary: {
      main: '#e30079',
    },
  },
});


const App = () => {
  const [data, setData] = useState({});
  const [isReadableReceipt, setIsReadableReceipt] = useState(true);
  const [components, setComponents] = useState([]);
  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {
    setData(testData.data);
    const componentsCopy = JSON.parse(JSON.stringify(testTemplate4.components));
    setComponents(componentsCopy);
  }, [])

  const handleFormSubmit = () => {
    setImgNum(getRandomInt(6));
    console.log(components);

    //reset
    const componentsCopy = JSON.parse(JSON.stringify(testTemplate4.components));
    setComponents(componentsCopy);
  };

  const handleChange = (id, value) => {
    const newComponents =  [...components]

    newComponents.forEach(field => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        field['field_value'] = value;
      }

      setComponents(newComponents)
    });
  }

  const imgArr = [
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/3abbce7b06c544d7a9d3bc82df3ab6ce.processing.jpeg",
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/d9948360894448ed854466eb721520c3.processing.jpeg",
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/7331d101739a480d955f5652749ec7ae.processing.jpeg",
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/7367f9c268544878990fab5b0d466750.processing.jpeg",
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/39f40bbf29d14af2874fa1879f488f6e.processing.jpeg",
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/0b641c0c2a3d4cd3bca6debccfdb965c.processing.jpeg",
    "https://d1kc7dadkq6rvs.cloudfront.net/receipts/ed0f8b18ef2b42bfa0b00e67633cf1ed.processing.jpeg"
  ]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <ThemeProvider theme={theme}>
      <FormContext.Provider value={{ handleChange }}>
        <div className={styles['app']}>
          <div className={styles['image-container']}>
            <img className={styles['image']} src={imgArr[imgNum]} alt="receipt"/>
          </div>
          <div className={styles['questionaire']}>
            <div className={styles['company-banner']}>
              <img className={styles['company-logo']} src="https://theme.zdassets.com/theme_assets/10637314/4dd9fafa0d3fd29621a8179d8ac02bb0e2cd3591.png" alt="logo"/>
            </div>
            <div className={styles['questionaire-sheet']}>
              <div className={styles['questionaire-info']}>
                <div style={{ alignItems: 'center', display: 'flex', gap: '10px'}}>
                  <h3>{data.title}: {data.receipt_id}</h3>
                  {data.warning_msg &&
                    <Tooltip title={data.warning_msg} enterDelay={200} leaveDelay={500} placement="top">
                      <WarningIcon color='warning'/>
                    </Tooltip>
                  }
                </div>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={!isReadableReceipt} onChange={(e) => setIsReadableReceipt(!e.target.checked)} />} label="Not a readable receipt" />
                </FormGroup>
              </div>
              <DynamicForm
                inputComponents={components}
                handleFormSubmit={handleFormSubmit}
              />
            </div>
          </div>
        </div>
      </FormContext.Provider>
    </ThemeProvider>
  );
}

export default App;
