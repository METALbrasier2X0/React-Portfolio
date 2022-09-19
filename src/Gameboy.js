/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/gameboy.glb')
  const [active, setActive] = useState(false);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
      <mesh geometry={nodes.Cube_1.geometry} material={materials['plastic color']} />
      <mesh geometry={nodes.Cube_2.geometry} material={materials['black plastic']} />
      <mesh onClick={(event) => setActive(!active)} geometry={nodes.Switch.geometry} material={materials['Material.001']} position={[0.52, 0.61, 0.07]} position={active ? [0.52, 0.61, 0.07]: [0.52, 0.55, 0.07]} scale={[0.01, 0.06, 0.03]} />
      <mesh geometry={nodes.Cartdrige.geometry} material={nodes.Cartdrige.material} position={[0.01, 0.59, 0]} scale={[0.35, 0.27, 0.03]} />
    </group>
  )
}

useGLTF.preload('/gameboy.glb')
