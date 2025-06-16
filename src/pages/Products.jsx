import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import "../styles/Products.css";
import Pagination from "../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
        const allCategories = ["all", ...new Set(data.map(p => p.category))];
        setCategories(allCategories);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice === "low") {
      result = result.filter((p) => p.price < 50);
    } else if (selectedPrice === "mid") {
      result = result.filter((p) => p.price >= 50 && p.price <= 100);
    } else if (selectedPrice === "high") {
      result = result.filter((p) => p.price > 100);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, selectedCategory, selectedPrice, products]);


  if (loading) return <Loader />;




  return (
    <div className="dashboard-container">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="filters">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
          ))}
        </select>

        <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
          <option value="all">All Prices</option>
          <option value="low">Below $50</option>
          <option value="mid">$50 - $100</option>
          <option value="high">Above $100</option>
        </select>
      </div>


      <div className="products-container">
        {currentProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <button className="action-button" onClick={() => addToCart(product)}>Add to Cart</button>
            <Link to={`/${product.id}`}>
              <button className="details-button">Details</button>
            </Link>
          </div>
        ))}

      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
};

export default Products;
