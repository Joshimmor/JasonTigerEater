import { useRef } from 'react'
import { Parallax, ParallaxLayer} from '@react-spring/parallax'
import Media from '../Media/Media';
import Events from '../Events/Events';
import "./Home.css"
// Little helpers ...
// const url = (name, wrap = false) =>
//   `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function App() {
  let screenSize =  window.innerWidth;
  const parallax = useRef()
  return (
    <div style={{ width: '100%', height: '100%', background: '#FAF9F6' }}>
      <Parallax ref={parallax} pages={3}>
        {/* <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#FAF9F6' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#FF7F50' }} /> */}

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: "background.png",
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
        </ParallaxLayer>

        <ParallaxLayer offset={screenSize > 675 ? 1 : .85} speed={0.65}
        style={{
            opacity: 0.98,
            display: 'flex',
            alignItems:"center",
            width:"100vw",
            flexDirection:"row",
            justifyContent: 'space-between',
            pointerEvents: 'none',
            zIndex: 3
          }}> 
          <div>
            <img src="./Llighttree.png" className='backtree' />
          </div>
          <div>
                  <img src="./LighttreeR.png" className='backtree' />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={screenSize > 675 ? .7 : .85} speed={0.5}
        style={{
            opacity: 0.98,
            display: 'flex',
            alignItems:"top",
            width:"100vw",
            flexDirection:"row",
            justifyContent: 'space-between',
            pointerEvents: 'none',
            zIndex: 3
          }}> 
          <div>
                  <img src="./LEFTT.png" className='fronttree' />
          </div>
          <div>
                  <img src="./RIGHTT.png"  className='fronttree'/>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.2} speed={0.5}
        style={{
            opacity: 0.98,
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'space-between',
            pointerEvents: 'none',
            
          }}> 
              {/* <div>
                  <img src="./Asset2.svg" style={{ display: 'block', width: '30vh',marginLeft: '-15%',rotate:"-85deg" }} />
              </div>
              <div
                      style={{
                        opacity: 0.98,
                        display: 'flex',
                        flexDirection:"row",
                        justifyContent: 'space-between',
                        pointerEvents: 'none',
                      }}>
                    <img src="./Asset1.svg" style={{ display: 'block', width: '20vh',marginLeft: '-25%',rotate:"-20deg" }} />
                    <img src="./Asset2.svg" style={{ display: 'block', width: '30vh',marginRight: '-25%',rotate:"0deg" }} />
              </div> */}
                
        </ParallaxLayer>

        {/* <ParallaxLayer offset={1.7} speed={0.8} style={{ opacity: 0.98 }}>
            <img src="./Asset1.svg" style={{ display: 'block', width: '20vh',marginLeft: '-20%',rotate:"-20deg" }} />
        </ParallaxLayer> */}

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>

        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>

        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>

        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => screenSize > 675 ? parallax.current.scrollTo(1):parallax.current.scrollTo(.7)}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection:"column",
            justifyContent: 'center',
          }}>
          <h1>JASON</h1>
          <h1>JASON</h1>
          <h1>JASON</h1>
        </ParallaxLayer>
        <ParallaxLayer
          offset={screenSize > 675 ? 1 : .7}
          speed={0.1}
          // onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}>
          <img src={"./middletiger.png"} style={{ width: '140%' }} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={screenSize > 675 ? 1 : .91}
          speed={0.2}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
        <img src={"./middletiger.png"} style={{ width: '140%' }} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={screenSize > 675 ? 1 : .85}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1.5)}
          style={{
            display: 'flex',
            width:'100vw',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}>
          <Media/>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.5}
          speed={0.3}
          // onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            width:'100vw',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0
          }}>
          <Events/>
        </ParallaxLayer>
        {/* <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage:`url(./WEB1.png)`,
            backgroundSize:"contain",
            height:"200vh",
            width:"100%"
          }}
          onClick={() => parallax.current.scrollTo(0)}>
        </ParallaxLayer> */}
      </Parallax>
    </div>
  )
}