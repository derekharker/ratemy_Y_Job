/* eslint-disable react/prop-types */
import InstagramIcon from '@mui/icons-material/Instagram';
// import TikTokIcon from './TiktokIcon';



const Footer = ({style = {width: '100%', background: '#0D579C', borderRadius: "8px"}}) => {
  return (
   
    <div style={style}>
        <img src="/src/assets/Final Blue Logo.png" alt="Logo" style={{maxHeight: "70px"}}/>
        <p style={{color: 'black', fontSize: 30, fontFamily: 'Libre Baskerville', fontStyle: 'italic', fontWeight: '400', wordWrap: 'break-word', paddingTop:"0"}}>Follow us!</p>
        <a href="https://www.instagram.com/ratemy_yjob/" className='social-link'><InstagramIcon fontSize='large'/></a>
        {/* <a href="https://www.instagram.com/ratemy_yjob/"><TikTokIcon/></a> */}
    </div>
   
  )
}


export default Footer
