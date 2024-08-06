/* eslint-disable react/prop-types */
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokIcon from './TiktokIcon';



const Footer = ({style = {width: '100%', background: '#0D579C'}}) => {
  return (
   
    <div style={style}>
        <p style={{color: "white", fontSize: 40, paddingBottom: 0}}>Ratemy {<img src="/src/assets/Y drawing.jpg" style={{maxHeight: "40px"}}/>}job</p>
        <p style={{color: 'black', fontSize: 30, fontFamily: 'Libre Baskerville', fontStyle: 'italic', fontWeight: '400', wordWrap: 'break-word'}}>Follow us!</p>
        <a href="https://www.instagram.com/ratemy_yjob/" className='social-link'><InstagramIcon fontSize='large'/></a>
        <a href="https://www.instagram.com/ratemy_yjob/"><TikTokIcon/></a>
    </div>
   
  )
}


export default Footer
