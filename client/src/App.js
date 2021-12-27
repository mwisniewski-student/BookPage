import BookList from './ui/books/BookList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthorList from './ui/authors/AuthorList';
import AuthorAdd from './ui/authors/AuthorAdd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import PageNavbar from './ui/PageNavbar';
import Footer from './ui/Footer';

function App() {
  return (
    <BrowserRouter>
      <PageNavbar />
      <main className='container mt-5'>
        <Switch>
          <Route path="/books" component={BookList} />
          <Route path="/authors" exact component={AuthorList} />
          <Route path="/authors/add" component={AuthorAdd} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
