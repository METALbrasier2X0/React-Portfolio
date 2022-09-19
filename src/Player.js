import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";

//forwardRef permet de déclarer le contenu du component comme utilisable par une ref
const Player = forwardRef((props, ref) => {
  //permet d'avoir accès aux propriétés du mesh ou on vas pouvoir le bouger par exemple
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  //permet de faire une animation ici une translation(on se sert plus tôt de translateX(0.01)
  //pour faire une translation et rotateX pour les rotations car cela prend en compte l'axe de l'objet)
  //le onclick permet de gerer le click sur un element html il peut etre
  //passe en props
  //useImperativehandle as besoin d'une ref que lon passe au component
  //afin de pouvoir utiliser ref.current.unefonction pour appeler une fonction
  //déclarée dans useimperativehandle dans le composant parent
  //et le second paramètre est une fonction qui renvoie un objet json
  //on peut donc avec la ref du mesh lui appliquer un mouvement
  useImperativeHandle(ref, () => ({
    moveForward: () => {
      mesh.current.translateY(-1);
    }
  }));
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
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
});

export default Player;
