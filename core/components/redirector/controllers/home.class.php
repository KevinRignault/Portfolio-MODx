<?php

class RedirectorHomeManagerController extends RedirectorManagerController {
    public function process(array $scriptProperties = array()) {

    }

    public function getPageTitle() { return $this->modx->lexicon('redirector'); }

    public function loadCustomCssJs() {
        $this->addJavascript($this->redirector->config['jsUrl'].'mgr/utils/fileuploadfield.xtype.js');

        $this->addJavascript($this->redirector->config['jsUrl'].'mgr/widgets/redirects.grid.js');
        $this->addJavascript($this->redirector->config['jsUrl'].'mgr/widgets/home.panel.js');
        $this->addJavascript($this->redirector->config['jsUrl'].'mgr/sections/index.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            MODx.load({ xtype: "redirector-page-home"});
        });
        </script>');
    }

    public function getTemplateFile() { return $this->redirector->config['templatesPath'].'home.tpl'; }
}