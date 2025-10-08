import React from 'react'

class ErrorBoundaryClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }
    
    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        console.error("Erro: ", error, errorInfo);
    }
    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    }

    handleReload = () => {
        window.location.reload();
    }

    render() {
    if (this.state.hasError) {
        return <ErrorFallback 
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        onReset={() => this.setState({ hasError: false, error: null, errorInfo: null })}
        onReload={() => window.location.reload()}
        />;
    }

    return this.props.children;
    }
}

const ErrorBoundary = ({ error, errorInfo, onReset, onReload }) => {
    return (
    <div style={styles.container}>
        <div style={styles.content}>
        <h1 style={styles.title}>😵 Algo deu errado!</h1>
        <p style={styles.message}>
            Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada.
        </p>
        
        <div style={styles.actions}>
            <button style={styles.button} onClick={onReset}>
            Tentar Novamente
            </button>
            <button style={{...styles.button, ...styles.secondaryButton}} onClick={onReload}>
            Recarregar Página
            </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
            <details style={styles.details}>
            <summary style={styles.summary}>Detalhes do Erro (Desenvolvimento)</summary>
            <pre style={styles.pre}>
                {error && error.toString()}
                {'\n'}
                {errorInfo.componentStack}
            </pre>
            </details>
        )}
        </div>
    </div>
    );
}

export default ErrorBoundaryClass