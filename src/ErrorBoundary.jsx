import React from "react";
import { Button, Icon, Modal, Result, Typography } from "antd";

const { Paragraph } = Typography;

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: {}, componentStack: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            ...this.state,
            error: error,
            componentStack: JSON.stringify(errorInfo)
        });
    }

    cacheClean = () => {
        let i;
        const rep = /.*\?.*/,
            //TODO css temizlemek icin biz sadece scripti temizliyecez.
            // links = document.getElementsByTagName("link"),
            scripts = document.getElementsByTagName("script"),
            process_scripts = false;
        // TODO css temizlemek icin biz sadece scripti temizliyecez.
        if (process_scripts) {
            for (i = 0; i < scripts.length; i++) {
                const script = scripts[i],
                    src = script.src;
                if (rep.test(src)) {
                    script.src = src + "&" + Date.now();
                } else {
                    script.src = src + "?" + Date.now();
                }
            }
        }

        Modal.success({
            content: "Cache başarıyla temizlendi",
            onOk: () => {
                this.setState({ hasError: false, error: {}, componentStack: "" });
            }
        });
    };

    localStorageClean = () => {
        localStorage.clear();

        Modal.success({
            content: "Local Storage başarıyla temizlendi",
            onOk: () => {
                this.setState({ hasError: false, error: {}, componentStack: "" });
            }
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="error"
                    title="HATA !"
                    subTitle="Beklenmeyen hata ile karşılaşılmıştır. Yaptığınız işlemin adımları ve ekran görüntüsü
                                ile birlikte zulkufadsiz@gmail.com adresine mail atınız."
                    extra={[
                        <Button
                            key="cache"
                            type="primary"
                            onClick={this.cacheClean.bind(this)}
                        >
                            Cache Temizle
                        </Button>,
                        <Button
                            key="localStorageClean"
                            type="danger"
                            onClick={this.localStorageClean.bind(this)}
                        >
                            Local Storage Temizle
                        </Button>,
                        <Button
                            key="reload"
                            type={"default"}
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Tekrar Deneyiniz
                        </Button>
                    ]}
                >
                    <div className="desc">
                        <Paragraph>
                            <Icon
                                style={{ color: "red" }}
                                type="close-circle"
                            />{" "}
                            {this.state.error.message}
                        </Paragraph>
                        <Paragraph>
                            <Icon
                                onClick={this.localStorageClean}
                                style={{ color: "red" }}
                                type="close-circle"
                            />
                            {this.state.componentStack}
                        </Paragraph>
                    </div>
                </Result>
            );
        }

        return this.props.children;
    }
}
