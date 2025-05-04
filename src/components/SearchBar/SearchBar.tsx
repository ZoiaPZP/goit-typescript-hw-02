import { Component, ChangeEvent, FormEvent } from 'react';
import css from './SearchBar.module.css';
import { toast } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

interface SearchbarProps {
  onSubmit: (query: string) => void;
}

interface SearchbarState {
  q: string;
}

export class Searchbar extends Component<SearchbarProps, SearchbarState> {
  state: SearchbarState = {
    q: '',
  };

  onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log('Input value onChange:', value);
    this.setState({ q: value });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Current input value:', this.state.q);

    if (!this.state.q.trim()) {
      toast.error('Please enter text for search!');
      return;
    }

    this.props.onSubmit(this.state.q.trim());
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <FaSearch />
          </button>
          <input
            onChange={this.onSearchChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            className={css.searchFormInput}
            value={this.state.q}
          />
        </form>
      </header>
    );
  }
}
