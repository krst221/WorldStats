import axios from 'axios';
import { useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput';

import { useTranslation } from "react-i18next";
import styles from '../styles/Home.module.css'



export default function Home({ countries }) {

  const [keyword, setKeyword] = useState('');

  const [t, i18n] = useTranslation('global');

  const filteredCountries = countries.filter((country) => 
    country.name.common.toLowerCase().includes(keyword) ||
    country.name.official.toLowerCase().includes(keyword) |
    country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (event) => {
    event.preventDefault();
    setKeyword(event.target.value.toLowerCase());
  }

  return (
      <Layout>
        <div className={styles.counts}>{t('search.found')} {countries.length} {t('search.countries')}</div>
        <SearchInput placeholder={t('search.placeholder')} onChange={onInputChange}/>
        <CountriesTable countries={filteredCountries} />
      </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get('https://restcountries.com/v3.1/all');
  const countries = await res.data;
  return {
    props: {
      countries,
    },
  };
};
