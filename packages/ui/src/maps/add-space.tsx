import { Map } from "./map"
import { SearchSpace } from "./search-space"
import { SpaceDetails } from "./space-location"

export function AddSpace() {

  return (
    <div>
      <SearchSpace />
      <Map id="addSpaceMap" />
      <SpaceDetails />
    </div>
  )
}
