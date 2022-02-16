import styles from '../styles/app.module.css'

export default function FooterPage() {
    return (
        <footer className={styles.footer}>
            <div>Copyright © {' '}
                <a href="https://www.обувьдетки.рф" target="_blank" rel="noopener noreferrer">
                    Обувьдетки.рф
                </a>
                {' '} 2022
            </div>
        </footer>
    );
};