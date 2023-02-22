import React, { useEffect } from "react";
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
import { TYPES_SEARCHROUTE } from "../../reducers/types/searchRouteType";

const ParamSection = ({
  categories,
  params,
  dispatch,
  filteredTypes,
  handleSearch,
}) => {
  const { FetchFunction } = ManageFetch();

  useEffect(() => {
    //
    /**  CATEGORIES  **/
    FetchFunction({ url: `${URL_API}/pcategory/list` }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({ type: TYPES_SEARCHROUTE.setCategories, payload: res.data });
      }
    });
    /**  TYPES  **/
    FetchFunction({ url: `${URL_API}/ptype/list` }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({
          type: TYPES_SEARCHROUTE.setTypes,
          payload: res.data,
        });
      }
    });
  }, []);

  return (
    <div>
      <form className="ParamSection-form" onSubmit={handleSearch}>
        <div className="ParamSection-div-name">
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) =>
              dispatch({
                type: TYPES_SEARCHROUTE.onChangeParams,
                payload: e.target,
              })
            }
            value={params.name || ""}
          />
          <button className="searchParam-submit">Search</button>
        </div>

        <p>Price</p>
        <div className="ParamSection-div-price">
          <label htmlFor="pmin">Min</label>
          <input
            type="number"
            id="pmin"
            name="pmin"
            min={0}
            onChange={(e) =>
              dispatch({
                type: TYPES_SEARCHROUTE.onChangeParams,
                payload: e.target,
              })
            }
            value={params.pmin || ""}
          />
          <label htmlFor="pmax">Max</label>
          <input
            type="number"
            id="pmax"
            name="pmax"
            min={parseInt(params.pmin) + 1 || 0}
            onChange={(e) =>
              dispatch({
                type: TYPES_SEARCHROUTE.onChangeParams,
                payload: e.target,
              })
            }
            value={params.pmax || ""}
          />
        </div>

        <p>Categories</p>
        <div>
          <select
            name="category"
            id="category"
            onChange={(e) => {
              dispatch({
                type: TYPES_SEARCHROUTE.onChangeParams,
                payload: e.target,
              });
              if (e.target.value === "") {
                dispatch({ type: TYPES_SEARCHROUTE.resetTypes });
              } else {
                dispatch({
                  type: TYPES_SEARCHROUTE.filterTypes,
                  payload: e.target.value,
                });
              }
            }}
            value={params.category || ""}
          >
            <option value="">---</option>
            {categories.length !== 0 &&
              categories.map((c) => (
                <option key={c.pc_id} value={c.pc_id}>
                  {c.pc_name}
                </option>
              ))}
          </select>
        </div>

        <p>Types</p>
        <div>
          <select
            name="type"
            id="type"
            onChange={(e) =>
              dispatch({
                type: TYPES_SEARCHROUTE.onChangeParams,
                payload: e.target,
              })
            }
            value={params.type || ""}
          >
            <option value="">---</option>
            {filteredTypes.length !== 0 &&
              filteredTypes.map((t) => (
                <option key={t.pt_id} value={t.pt_id}>
                  {t.pt_name}
                </option>
              ))}
          </select>
        </div>

        <p>Status</p>

        <div>
          <select
            name="status"
            id="status"
            onChange={(e) =>
              dispatch({
                type: TYPES_SEARCHROUTE.onChangeParams,
                payload: e.target,
              })
            }
            value={params.status || ""}
          >
            <option value="">---</option>
            <option value="new">new</option>
            <option value="used">used</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ParamSection;
