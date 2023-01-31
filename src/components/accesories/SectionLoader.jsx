import "../../css/accesories/SectionLoader.css";

/**
 * USO: Colocarlo dentro de una sección de un componente.
 * NO es para la página completa
 * **/

const SectionLoader = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SectionLoader;
