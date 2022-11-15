/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import Layout from '../../components/Layout/Layout';
import { useTranslation } from "react-i18next";
import styles from './Country.module.css'

const Country = ({ country }) => {
  const [t, i18n] = useTranslation('global');
  
  return (
    <Layout title={country[0].name.common}>
      <div className={styles.country_container}>
        <div className={styles.overview_panel}>
          <img src={country[0].flags.svg} alt={country[0].name.common} />
          <h1 className={styles.overview_name}>{country[0].name.official}</h1>
          <div className={styles.overview_region}>{country[0].region}</div>
          
          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>{country[0].population}</div>
              <div className={styles.overview_label}>{t('tags.population')}</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{country[0].area} km²</div>
              <div className={styles.overview_label}>{t('country.area')}</div>
            </div>
          </div>
        </div>

        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>{t('country.details')}</h4>
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>{country[0].capital}</div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>{t('country.subregion')}</div>
            <div className={styles.details_panel_value}>{country[0].subregion}</div>
          </div>

          {country[0].borders &&
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>{t('country.borders')}</div>
              <div className={styles.details_panel_value}>{
                country[0].borders.map((border) => {return <h1 key={border}>{border}.</h1>})
              }
              </div>
            </div>
          }

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Latitudes</div>
            <div className={styles.details_panel_value}>{
              country[0].latlng.map((latitudes) => {return <h1 key={latitudes}>{latitudes}.</h1>})
            }
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>{t('country.coat')}</div>
            <div className={styles.details_panel_value}>
              <img src={country[0].coatOfArms.svg} alt={country[0].name.common} />
            </div>
          </div>
          
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>{t('country.timezone')}</div>
            <div className={styles.details_panel_value}>{country[0].timezones}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://restcountries.com/v3.1/name/${params.id}`);
  const country = await res.data;
  return {
    props: {
      country,
    },
  }
}