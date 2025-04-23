import './SplashScreen.css'
import Logo from '../assets/solyo.svg'

function SplashScreen(){
    return(
        <div className='splash-screen'>
            <img src={Logo} alt = "Solyo-logo" className='Logo' />
            <h3 style={{color:'black'}}>Solyo - Capture your Journey Your Way ;)</h3>
        </div>
    )
}
export default SplashScreen