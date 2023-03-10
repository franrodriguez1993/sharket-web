import React from "react";
import TYPES_SELLPRODUCTS from "../../reducers/types/sellProductsTypes";
import cross from "../../svg/cross_blue.svg";

/**  COMPONENT:  **/
const SellForm = ({
  form,
  filteredTypes,
  categories,
  addresses,
  dispatch,
  handleChange,
  handleImageChange,
  handleSellProduct,
  image,
  errors,
}) => {
  return (
    <form className="sellForm" onSubmit={handleSellProduct}>
      {/** ---- CATEGORY ----  **/}
      <label htmlFor="category" className="form_label">
        Category:
      </label>
      <select
        name="category"
        id="category"
        className={`form_input  ${errors.category && "form_input-error"}`}
        onChange={(e) => {
          handleChange(e);
          if (e.target.value === "") {
            dispatch({ type: TYPES_SELLPRODUCTS.resetTypes });
          } else {
            dispatch({
              type: TYPES_SELLPRODUCTS.filterTypesByCategory,
              payload: e.target.value,
            });
          }
        }}
        value={form.category || ""}
      >
        <option value=""> ---- </option>
        {categories.length !== 0 &&
          categories.map((c) => (
            <option key={c.pc_id} value={c.pc_id}>
              {c.pc_name}
            </option>
          ))}
      </select>

      {errors.category && (
        <p className="form_input-error--p">{errors.category}</p>
      )}

      {/** ---- TYPES ----  **/}
      <label htmlFor="type" className="form_label">
        Type:
      </label>
      <select
        name="type"
        id="type"
        className={`form_input  ${errors.type && "form_input-error"}`}
        onChange={handleChange}
        value={form.type || ""}
      >
        <option value=""> ---- </option>
        {filteredTypes.length !== 0 &&
          filteredTypes.map((t) => (
            <option key={t.pt_id} value={t.pt_id}>
              {t.pt_name}
            </option>
          ))}
      </select>

      {errors.type && <p className="form_input-error--p">{errors.type}</p>}

      {/** ---- NAME ----  **/}
      <label htmlFor="name" className="form_label">
        Product name:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={`form_input  ${errors.name && "form_input-error"}`}
        onChange={handleChange}
        value={form.name || ""}
      />
      {errors.name && <p className="form_input-error--p">{errors.name}</p>}

      {/** ---- BRAND ----  **/}
      <label htmlFor="brand" className="form_label">
        Brand:
      </label>
      <input
        type="text"
        name="brand"
        id="brand"
        className={`form_input  ${errors.brand && "form_input-error"}`}
        onChange={handleChange}
        value={form.brand || ""}
      />
      {errors.brand && <p className="form_input-error--p">{errors.brand}</p>}

      {/** ---- PRICE ----  **/}
      <label htmlFor="price" className="form_label">
        Price:
      </label>
      <input
        type="number"
        name="price"
        id="price"
        className={`form_input  ${errors.price && "form_input-error"}`}
        onChange={handleChange}
        value={form.price || ""}
        min={1}
      />

      {errors.price && <p className="form_input-error--p">{errors.price}</p>}

      {/** ---- STOCK ----  **/}
      <label htmlFor="stock" className="form_label">
        Stock:
      </label>
      <input
        type="number"
        name="stock"
        id="stock"
        className={`form_input  ${errors.stock && "form_input-error"}`}
        onChange={handleChange}
        value={form.stock || ""}
        min={1}
      />

      {errors.stock && <p className="form_input-error--p">{errors.stock}</p>}

      {/** ---- STATUS ----  **/}
      <label htmlFor="status" className="form_label">
        Status:
      </label>
      <select
        name="status"
        id="status"
        className={`form_input  ${errors.status && "form_input-error"}`}
        onChange={handleChange}
        value={form.status || ""}
      >
        <option value="">---</option>
        <option value="new">new</option>
        <option value="used">used</option>
      </select>

      {errors.status && <p className="form_input-error--p">{errors.status}</p>}

      {/** ---- WARRANTY ----  **/}
      <label htmlFor="warranty" className="form_label">
        Warranty
      </label>
      <i>Warranty time in months</i>
      <input
        type="number"
        name="warranty"
        id="warranty"
        className={`form_input  ${errors.warranty && "form_input-error"}`}
        onChange={handleChange}
        value={form.warranty || ""}
        min={0}
      />

      {errors.warranty && (
        <p className="form_input-error--p">{errors.warranty}</p>
      )}

      {/** ---- ADDRESS ----  **/}
      <label htmlFor="address" className="form_label">
        Address
      </label>
      <select
        name="address"
        id="address"
        className={`form_input  ${errors.address && "form_input-error"}`}
        onChange={handleChange}
        value={form.address || ""}
      >
        <option value="">----</option>
        {addresses.length !== 0 &&
          addresses.map((a) => (
            <option
              key={a.address_id}
              value={a.address_id}
            >{`${a.address_city} - ${a.address_state}`}</option>
          ))}
      </select>

      {errors.address && (
        <p className="form_input-error--p">{errors.address}</p>
      )}

      {/** ---- DESCRIPTION ----  **/}
      <label htmlFor="description" className="form_label">
        Description:
      </label>
      <textarea
        name="description"
        id="description"
        className={`sellForm-textarea ${
          errors.description && "form_input-error"
        }`}
        onChange={handleChange}
        value={form.description || ""}
      ></textarea>

      {errors.description && (
        <p className="form_input-error--p">{errors.description}</p>
      )}

      {/** ---- IMAGE FILE AND PREVIEW ----  **/}
      <label htmlFor="image" className="form_label">
        Product image:
      </label>
      {image.preview && (
        <div className="sellForm-previewImg_container">
          <img
            src={cross}
            alt="cross-delete"
            className="sellForm-previewImg_cross"
            onClick={() => dispatch({ type: TYPES_SELLPRODUCTS.resetImgFile })}
          />
          <img
            src={image.preview}
            alt="product-preview"
            className="sellForm-previewImg_img"
          />
        </div>
      )}
      <input
        type="file"
        name="product"
        id="image"
        accept="image/*"
        formEncType="multipart/form-data"
        onChange={handleImageChange}
      />

      <button className="sellForm--button"> Create </button>
    </form>
  );
};

export default SellForm;
