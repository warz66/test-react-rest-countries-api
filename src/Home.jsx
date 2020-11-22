import './Home.css';
import React from "react";
import CountryBox from './CountryBox';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openSelect: false,
            error: null,
            isLoaded: false,
            countries: [],
            region: 'Filter by Region',
            search: ''
        }
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                countries: result,
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        
      }

    render() {
        let countriesSection;
        const { error, isLoaded, countries } = this.state;
        if(error) {
            countriesSection = 
                <div className="error">
                    <p>{error.message}</p>
                </div>
        } else if (!isLoaded) {
            countriesSection = <div id="loading-countries">Loading...</div>
        } else {
            countriesSection = 
            <section id="countries">
                <div id="countries-box">
                    {countries.map( country => {
                        return <CountryBox country={country} key={country.name}/> 
                    })}
                </div>
            </section>
        }
        return(
            <div>
                <div id="search-filter-panel">
                    <div id="search-country-wrapper">
                        <input type="text" v-model="search" aria-label="Allows you to search for a country" placeholder="Search for a country..."/>
                    </div>

                    {/*<div id="select-region-wrapper">
                        <div id="select-region-btn">
                        {{region}}
                        <svg width="12px" height="12px" viewbox="0 0 12 12" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g id="check"><path d="M0 0L12 0L12 12L0 12L0 0Z" id="Rectangle" fill="none" fill-rule="evenodd" stroke="none" /><g id="expand-more" transform="translate(1.5 3.75)"><path d="M7.95 1.33227e-15L4.5 3.45L1.05 1.33227e-15L0 1.05L4.5 5.55L9 1.05L7.95 1.33227e-15Z" transform="translate(0 -0.3)" id="Shape" fill-rule="evenodd" stroke="none" /></g></g></svg>
                        </div>
                        <transition name="slide"> 
                        <div id="select-region-nav" v-show="openSelect">
                            <ul>
                            <li onClick={() => {region='Filter by Region'; openSelect=!openSelect;}}>All</li>
                            <li onClick={region='Africa'; openSelect=!openSelect}>Africa</li>
                            <li onClick={region='Americas'; openSelect=!openSelect}>America</li>
                            <li onClick={region='Asia'; openSelect=!openSelect}>Asia</li>
                            <li onClick={region='Europe'; openSelect=!openSelect}>Europe</li>
                            <li onClick={region='Oceania'; openSelect=!openSelect}>Oceania</li>
                            </ul>
                        </div>
                        </transition> 
                    </div>*/}
                </div>
                

                
                {/*{(this.state.error && 
                    <div className="error">
                        <p>{error.message}</p>
                    </div>) ||
                (!this.state.isLoaded &&
                    <div>Loading...</div>) || 
                    <div id="countries-box">
                        {countries.map( country => {
                            return <CountryBox country={country} key={country.name}/> 
                        })}
                    </div>}*/}
                {/*{this.state.isLoaded && <div id="countries-box">
                    {this.state.countries.map(country=>{
                        return <CountryBox country={country} key={country.name}/> 
                    })}
                </div>}*/}
                {countriesSection}
                

                {/*<section id="countries">
                    <div v-if="error" class="error">
                        <p>{{error.message}}</p>
                    </div>
                    <div id="countries-box" v-else-if="error === false">
                        <CountryBox v-for="country in countries" :key="country" v-show="filter(country)" :country="country" />
                    </div>
                </section>*/}
            </div>
        );
    }
}

export default Home;