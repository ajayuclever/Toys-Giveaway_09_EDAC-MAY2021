import React from 'react'

import '../App.css'

const Footer = ({bottom}) => {
    return(
        <footer className={bottom ? 'footer-bottom bg-success' : 'bg-success'}>
          <span>Copyright @ ToysGiveAway.Com</span>
        </footer>
    )
}

export default Footer;