import Logo from '../../assets/Icons/Blue Fast Media Tech Logo Design.png'
import underMaintainerPanda from "../../assets/Icons/Panda__HD_-removebg-preview.png"
import Gear from '../../assets/Gifs/Gear.gif'
import fallingCylinder from '../../assets/Gifs/Cylinder.gif'

function UnderDev() {
  return (
    <>
      <div className="w-full h-screen relative" >
        <div className="w-full flex justify-center p-5 relative z-10">
          <img className='w-[15rem]' src={Logo} alt="Logo of Echo Stream" />
        </div>
        <div className="flex flex-col justify-center items-center mt-10 relative z-10">
          <h1 className='text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 '> Website is under development </h1>
          <img className='md:w-[15rem] w-[10rem] md:mt-28 mt-36 ' src={underMaintainerPanda} alt="panda image" />
        </div>
      </div>
      <div className="">
        <img className='w-[15rem] absolute top-[35%] right-[0%] md:top-[35%] md:right-[20%] ' src={Gear} alt="Gear gif" />
        <img className='md:w-[15rem] w-[10rem]  absolute bottom-[0%] left-[0%] md:bottom-[0%] md:left-[10%]' src={fallingCylinder} alt="Cylinder Gif" />
      </div>
    </>
  )
}

export default UnderDev