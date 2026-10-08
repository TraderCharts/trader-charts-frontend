const softColors = [
    "#DCE9F8", // Mist Blue
    "#F5F6F8", // Cloud Gray
    "#F9E4E8", // Blush Pink
    "#F2E8DA", // Sand Beige
    "#E8E2F7", // Lilac Mist
    "#E2F4EA", // Mint Cream
    "#E3F2FD", // Sky Whisper
    "#FEEAE0", // Peach Haze
    "#E7E3F3", // Lavender Fog
    "#E9F6E8", // Pistachio Cream
    "#D8EAF3", // Powder Blue
    "#E8C9C9", // Dusty Rose
    "#FAFAFA", // Pearl White
    "#E3D7E7", // Misty Mauve
    "#D6F0F0", // Icy Aqua
    "#E5DDD2", // Soft Taupe
    "#FFD9C7", // Pastel Coral
    "#E5EFE3", // Pale Sage
    "#FFF4DE", // Butter Cream
    "#ECECEC", // Warm Gray
];

const getRandomSoftColor = () => {
    const randomIndex = Math.floor(Math.random() * softColors.length);
    return softColors[randomIndex];
};

export default getRandomSoftColor;
