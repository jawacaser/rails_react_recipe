import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    const contactImg = "https://lh3.googleusercontent.com/Po_DX1q6B2sQlwSL2aKVFZ1IE7GWQabMqyx5jCn3YQqjimhs7sVO00acjS1POVGLonZV1HPzPnt7ZMuzZwSY-v_voI4TUvQi7bLGF-tZEr2FwryXDPZVYnGXHzIsU555yO5tZeGPgZNdkTMPmBjhTuLl1QjLIkyDQsnX4t7x6529sjHYSoH1lvkNMaCPFNCKSdm8dD3bo1_lWpoqrGhyvNWdgqW7BXNjWx9JO7C9JUy2satggMr4uvPDgukV_zwa5UHpfCzL9VxK2zr0bBAyDiYUanQO9cFQ6yvcanY4Z3e3u2Hkc1G3mGL7B24vJiwNxGvQm-oG_ETgHYTWNJmRZHjJn8NpliazjRk7ONw4HdazF_fUWgTNig3ukemaHDG5pXexbE1-jvOgDUmf-18-_yc4J7ZcZ814tYpJCQ-nRO7KbS7lWNwe3qtNS7FZDaSinvmiH0S0IZb30XYLWIB7e1wmhtSPyY_BHZ_hhPhKr5_1taudPvGV-ZKNfPtsmeSh9PzHHVxDGo0sg_SfTf0QAseeF9qXYXFnOo6PZPLDzfYPyVOIYpc7bNvEjCvNJ6ZN3IUQ6sypt6mCKZr_Z79fNEjeVpyRSO7WiSIPmt8xYLqRytwTid8bCvPzgIKOfYz9aDYiSviZKbFMX4_kg9evbSxh71mz7qHd2GxikgsPSOtORZ2a6K9WTUIC_aVFBNxmtyEuoj2g5vHKRUj53sOyuOiT7EAMV2IGlzU5oVRDOgk03swuL7cy01W43N4TXIGU2IYqU6b1kNHE5KBGUjCESPfZ70nRF92LirmZC9IHGLkvH_Cwvlh9E-N98TV9OrjQJ9AZo8YmF5nhVmCdcvPI-nIhM5Y4J43UrExAzi7FZg=w940-h788-no?authuser=0"

    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-white">
          <div className="container bg_secondary-color p-5 text-center">
            <img className="img-fluid too-large-img" src={contactImg} />
            {/* <h1 className="display-4">Let's Eat Well</h1> */}
            <p className="lead mt-4 text-white">
              Join us on <a href="https://www.facebook.com/groups/letseatwell/" style={{color:'#C1E1C1'}}>Facebook</a> for additional content and tips.
            </p>
            <hr className="my-2" />
            <Link
              to="/recipes"
              className="btn custom-button2"
              role="button"
            >
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    );
}