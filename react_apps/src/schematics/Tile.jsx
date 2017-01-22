import React from 'react';


const Tile = ({ pageurl, photourl, title, author, company }) => (

    <div className="card">
        <a className="inherit-color" href={pageurl}>
            <img className="card-img" src={photourl}></img>
            <div className="card-img-overlay">
                <h4 className="card-title text-overlay">{title}</h4>
                <p className="card-text text-overlay">{author}</p>
                <p className="card-text text-overlay">{company}</p>
            </div>
        </a>
    </div>

)