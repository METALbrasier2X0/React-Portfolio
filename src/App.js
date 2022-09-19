import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import Gameboy from "./Gameboy";
import Player from "./Player";

import "./styles.css";

function Box(props) {
  //permet d'avoir accès aux propriétés du mesh ou on vas pouvoir le bouger par exemple
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  //permet de faire une animation ici une translation(on se sert plus tôt de translateX(0.01)
  //pour faire une translation et rotateX pour les rotations car cela prend en compte l'axe de l'objet)
  useFrame((state, delta) => (mesh.current.position.x += 0.01));
  //le onclick permet de gerer le click sur un element html il peut etre
  //passe en props
  //on se sert des props avec props.lenomdelaprops
  //une props peut etre tout ce que l on veut du texte, des chiffres etc...
  //ici notre composant mesh permet d afficher des spheres
  //et il contiens d autres composants notemment le composant meshPhongMaterial
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}



//orbitcontrols permet de controler la caméra et de la bouger(
//de se déplacer dans le monde)
//sky rajoute une atmosphère, on peut modifier le cycle jour nuit avec
//la propriété positio
//il existe différents types d'éclairage qui vont agir sur les objets
//ayant un phong ou lambert material
//lorsque l'on utilise un objet ou une texture que l'on importe il faut le
//mettre dans les balises suspense pour attendre le temps de chargement
//ce qui est dans la prop fallback est ce qui vas être affiché en attendant
export default function App() {
  const playerRef = useRef();
  //tabindex permet d'identifier l'élément sur lequelle un
  //event appui de touche se produit
  //c'est avec la ref playerref que l'on appelle les fonctions
  //se trouvant dans le component player en l'appliquant directement
  //sur son component
  return (
    <div
      id="worldContainer"
      tabIndex="0"
      onKeyDown={() => {
        playerRef?.current?.moveForward();
      }}
    >
      <Canvas>
        <OrbitControls />
        <directionalLight position={[5, 10, 10]}  intensity={5} />
        <ambientLight intensity={0.5} />
        <Sky posX={0.5} />
        <Box position={[1, 1, 2]} />
        <Box position={[2, 1, 2]} />
        <Suspense fallback={null}>
          <Gameboy scale={3}/>
        </Suspense>
      </Canvas>
    </div>
  );
}
