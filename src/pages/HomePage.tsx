
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { RootState } from "../app/store";
import {
  setLists, setItems, addList, addItem,
  deleteItem, deleteList
} from "../shopping/shoppingSlice";
import { apiRequest } from "../services/api";
import type { ShoppingItem, ShoppingList } from "../types";
import CategoryFilter from "../components/CategoryFilter";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { lists, items } = useSelector((state: RootState) => state.shopping);
  const [params, setParams] = useSearchParams();
  const [newList, setNewList] = useState("");
  const [newItem, setNewItem] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [category, setCategory] = useState("Other");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      try {
        const [allLists, allItems] = await Promise.all([
          apiRequest<ShoppingList[]>(`/shoppingLists?userId=${user!.id}`),
          apiRequest<ShoppingItem[]>(`/items?userId=${user!.id}`)
        ]);
        dispatch(setLists(allLists));
        dispatch(setItems(allItems));
      } catch {
        toast.error("Unable to load shopping data");
      }
    }

    void loadData();
  }, [user, dispatch]);

  const search = params.get("search") ?? "";
  const sort = params.get("sort") ?? "date";

  const visibleItems = useMemo(
  () =>
    items
      .filter(
        (item) => !selectedList || item.listId === selectedList
      )
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter(
        (item) =>
          categoryFilter === "All" ||
          item.category === categoryFilter
      )
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "category")
          return a.category.localeCompare(b.category);

        return b.createdAt.localeCompare(a.createdAt);
      }),
  [items, selectedList, search, sort, categoryFilter]
);
<CategoryFilter
  selectedCategory={categoryFilter}
  onCategoryChange={setCategoryFilter}
/>

  async function createList() {
    if (!newList.trim() || !user) return;

    try {
      const list: ShoppingList = {
        id: crypto.randomUUID(),
        userId: user.id,
        name: newList.trim(),
        createdAt: new Date().toISOString()
      };
      await apiRequest("/shoppingLists", {
        method: "POST", body: JSON.stringify(list)
      });
      dispatch(addList(list));
      setNewList("");
      toast.success("Shopping list created");
    } catch {
      toast.error("Could not create list");
    }
  }

  async function createItem() {
    if (!newItem.trim() || !selectedList || !user) {
      toast.error("Enter an item name and select a list");
      return;
    }

    try {
      const item: ShoppingItem = {
        id: crypto.randomUUID(),
        listId: selectedList,
        userId: user.id,
        name: newItem.trim(),
        quantity,
        notes,
        category,
        imageUrl: "",
        createdAt: new Date().toISOString()
      };
      await apiRequest("/items", {
        method: "POST", body: JSON.stringify(item)
      });
      dispatch(addItem(item));
      setNewItem("");
      setNotes("");
      setQuantity(1);
      toast.success("Item added");
    } catch {
      toast.error("Could not add item");
    }
  }

  async function removeItem(item: ShoppingItem) {
    if (!window.confirm(`Delete ${item.name}?`)) return;
    try {
      await apiRequest(`/items/${item.id}`, { method: "DELETE" });
      dispatch(deleteItem(item.id));
      toast.success("Item deleted");
    } catch {
      toast.error("Could not delete item");
    }
  }

  async function removeList(list: ShoppingList) {
    if (!window.confirm(`Delete "${list.name}" and its items?`)) return;
    try {
      const listItems = items.filter((item) => item.listId === list.id);
      await Promise.all([
        ...listItems.map((item) =>
          apiRequest(`/items/${item.id}`, { method: "DELETE" })
        ),
        apiRequest(`/shoppingLists/${list.id}`, { method: "DELETE" })
      ]);
      dispatch(deleteList(list.id));
      if (selectedList === list.id) setSelectedList("");
      toast.success("Shopping list deleted");
    } catch {
      toast.error("Could not delete list");
    }
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR PERSONAL SHOPPING SPACE</p>
          <h1>My Shopping Lists</h1>
          <p className="muted">Everything you need, all in one place.</p>
        </div>
      </div>

      <section className="panel">
        <h2><Plus size={19} /> Create a shopping list</h2>
        <div className="inline-form">
          <input placeholder="e.g. Weekly groceries"
            value={newList} onChange={(e) => setNewList(e.target.value)} />
          <button className="primary-btn" onClick={createList}>Create list</button>
        </div>
      </section>

      <section className="panel">
        <h2>Add an item</h2>
        <div className="form-grid">
          <input placeholder="Item name" value={newItem}
            onChange={(e) => setNewItem(e.target.value)} />
          <select value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}>
            <option value="">Choose a list</option>
            {lists.map((list) => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["Fruit", "Vegetables", "Dairy", "Bakery", "Household", "Other"]
              .map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="number" min={1} value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} />
          <input placeholder="Optional notes" value={notes}
            onChange={(e) => setNotes(e.target.value)} />
          <button className="primary-btn" onClick={createItem}>Add item</button>
        </div>
      </section>

      <section className="panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input aria-label="Search items" placeholder="Search items..."
              value={search}
              onChange={(e) => setParams((p) => {
                e.target.value ? p.set("search", e.target.value) : p.delete("search");
                return p;
              })} />
          </div>
          <select aria-label="Sort items" value={sort}
            onChange={(e) => setParams((p) => {
              p.set("sort", e.target.value);
              return p;
            })}>
            <option value="name">Sort by name</option>
            <option value="category">Sort by category</option>
            <option value="date">Date added</option>
          </select>
        </div>

        <h2>Your lists</h2>
        <div className="list-grid">
          {lists.map((list) => (
            <article className="list-card" key={list.id}>
              <div className="list-card-heading">
                <button className="text-button"
                  onClick={() => setSelectedList(list.id)}>
                  {list.name}
                </button>
                <button className="icon-button danger"
                  aria-label={`Delete ${list.name}`}
                  onClick={() => void removeList(list)}>
                  <Trash2 size={17} />
                </button>
              </div>
              <p className="muted">
                {items.filter((item) => item.listId === list.id).length} items
              </p>
              <button className="secondary-btn"
                onClick={() => setSelectedList(list.id)}>
                View items
              </button>
            </article>
          ))}
          {lists.length === 0 && (
            <p className="muted">No shopping lists yet. Create your first one!</p>
          )}
        </div>

        <h2>Shopping items</h2>
        <div className="item-list">
          {visibleItems.map((item) => (
            <article className="item-row" key={item.id}>
              <div className="item-avatar">{item.name.charAt(0).toUpperCase()}</div>
              <div className="item-info">
                <strong>{item.name}</strong>
                <span className="muted">
                  {item.category} · Qty: {item.quantity}
                </span>
                {item.notes && <span className="muted">{item.notes}</span>}
              </div>
              <button className="icon-button danger"
                aria-label={`Delete ${item.name}`}
                onClick={() => void removeItem(item)}>
                <Trash2 size={17} />
              </button>
            </article>
          ))}
          {visibleItems.length === 0 && (
            <p className="muted">No matching items found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
