import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Split from 'react-split';
import Navbar from '../Navbar/Navbar';

const Home = () => {

    // Panel texts
    const [panelText, setPanelText] = useState({
        panel1: "",
        panel2: "",
        panel3: ""
    });

    useEffect(() => {
        async function fetchData() {
            await axios.get("https://precily-intern-be.herokuapp.com/api/getData")
            .then(res => {
                if (res.data === "") {
                } else {
                    setPanelText(res.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <Split direction='vertical' style={{ height: 'calc(100vh - 90px)' }} snapOffset={0} gutterSize={8} minSize={200}>
                <Split className='panel-top' gutterSize={8} minSize={200} sizes={[40, 60]}>
                    <div className='panel-1 panel'>{ panelText.panel1 }</div>
                    <div className='panel-2 panel'>{ panelText.panel2 }</div>
                </Split>
                <div className='panel-3 panel'>{ panelText.panel3 }</div>
            </Split>
        </div>
    );
}

export default Home;