import Image from "next/image"
const FooterHeader = () =>{
const content = [
    {
        img:"high-quality.png",
        title: "High Quality",
        para: "crafted from top materials"
    },
    {
        img:"guarantee.png",
        title: "Warranty Protection",
        para: "Over 2 years"
    },
    {
        img:"shipping.png",
        title: "Free Shipping",
        para: "Order over 150 $"
    },
    {
        img:"support.png",
        title: "24 / 7 Support",
        para: "Dedicated support"
    },
]

    return(
        <>
<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 bg-lightSkin justify-around items-center mt-14 py-6 ">
    {
        content.map((crnt,ind)=>{
            return(
                <div key={ind} className="flex justify-center items-center m-8" >
                  <Image
                  src={`/images/${crnt.img}`}
                  alt={crnt.title}
                  width={60}
                  height={60}
                  className=" me-2"
                  />
                    <div>
                        <h5 className="font-bold text-xl" >{crnt.title}</h5>
                        <p>{crnt.para}</p>
                    </div>
                </div>
            )
        })
    }
</div>

        </>
    )
}
export default FooterHeader;