import React from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };
  onChangeValue = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase() });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Поле пошуку пусте');
      return;
    }
    this.props.onSubmitQuery(this.state.query);
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.searchFormBtn}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeValue}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}
