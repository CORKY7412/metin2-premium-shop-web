import type { Item } from "../models/Item"

type ItemDescriptionPageProps = { item: Item }

export const ItemDescriptionPage = ({ item }: ItemDescriptionPageProps) => {
  return (
    <>
      <h1>
        Name: {item.name} <br />
        Preis: {item.price}
      </h1>
    </>
  )
}