import loadingGif from '../../assets/Gifs/ezgif-5-b49d5ef268.gif'

function HomeLoader() {
  return (
    <>
      <div className="w-full h-screen relative flex justify-center bg-[#242424] ">
        <div className="fixed md:top-[0%] top-[20%]">
        <img className='' src={loadingGif} alt="Loading animation" />
        </div>
      </div>
    </>
  )
}

export default HomeLoader