export default function WallpaperDispay({phase}){
    const WallpaperMap={
        sunrise:'/day.jpg',
        day:'/Day1.jpg',
        sunset:'/day2.jpg',
        night: '/night.jpg',
    };

    return(
        <div className="h-screen w-screen bg-cover bg-center" style={{background:`url(${WallpaperMap[phase]})`}}/>
    );
}