import BookList from './ui/books/BookList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthorList from './ui/authors/AuthorList';
import AuthorAdd from './ui/authors/AuthorAdd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import PageNavbar from './ui/PageNavbar';
import Footer from './ui/Footer';
import AuthorDetails from './ui/authors/AuthorDetails';
import AuthorEdit from './ui/authors/AuthorEdit';
import BookDetails from './ui/books/BookDetails';
import BookAdd from './ui/books/BookAdd';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <PageNavbar />
        <main className='container mt-5 mb-3'>
          <Switch>
            <Route path="/books" exact component={BookList} />
            <Route path="/books/add" component={BookAdd} />
            <Route path="/books/:id" component={BookDetails} />
            <Route path="/authors" exact component={AuthorList} />
            <Route path="/authors/add" exact component={AuthorAdd} />
            <Route path="/authors/:id" exact component={AuthorDetails} />
            <Route path="/authors/:id/edit" component={AuthorEdit} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter >
  );
}

export default App;
