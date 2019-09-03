import React from 'react';
import Article from '../../componentes/article'
import Categoria from '../../componentes/categorias'
// import { Container } from './styles';

const axios = require('axios');



class Inicio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    async addNoticia() {
        let final = []

        let articles = await axios.get('http://localhost:8080/')
        articles.data.forEach(element => {
            final.push(<Categoria articles={element.artigos} title={element.title} ord={element.ordem}></Categoria>);
        })
        this.setState({ articles: final }, () => console.log(final));

    }

    componentDidMount() {
        this.addNoticia();
    }

    render() {
        return (
            <div>
                <div className="container " >
                    <header>
                        <div className="d-flex mt-3 flex-wrap col-md-12">
                            <h2>Central de Noticias</h2>
                            <p className="ml-5"> Noticias em tempo real</p>
                        </div>
                    </header>
                </div>
                <div style={{ height: 15, background: "black" }} className="my-2" ></div>
                <div className="container ">
                    <div className="row">
                        {this.state.articles}
                    </div>
                </div>
            </div>
        );
    }
}

export default Inicio;
