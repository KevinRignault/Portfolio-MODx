<?php

/** @var modX|xPDO $modx */
$modx =& $object->xpdo;

$modx->log(xPDO::LOG_LEVEL_INFO, 'Making database changes.');
switch($options[xPDOTransport::PACKAGE_ACTION]) {
	//case xPDOTransport::ACTION_INSTALL:
	case xPDOTransport::ACTION_UPGRADE:

        $modelPath = $modx->getOption('redirector.core_path', null, $modx->getOption('core_path').'components/redirector/').'model/';
		$modx->addPackage('redirector', $modelPath);

        /** @var xPDOManager $manager */
        $manager = $modx->getManager();

        // to not report table creation in the console
        $oldLogLevel = $modx->getLogLevel();
        $modx->setLogLevel(0);

		$manager->addField('modRedirect', 'context_key', array('after' => 'target'));

        $manager->addIndex('modRedirect', 'pattern');
        $manager->addIndex('modRedirect', 'context_key');
        $manager->removeIndex('modRedirect', 'pattern_context');

        $manager->addField('modRedirect', 'triggered', array('after' => 'context_key'));
        $manager->addField('modRedirect', 'triggered_first', array('after' => 'triggered'));
        $manager->addField('modRedirect', 'triggered_last', array('after' => 'triggered_first'));

        // set back console logging
        $modx->setLogLevel($oldLogLevel);

        // update controller location
        $modAction = $modx->getObject('modAction', array('namespace' => 'redirector', 'controller' => 'index'));
        if(!empty($modAction) && is_object($modAction)) {
            $modAction->set('controller', 'controllers/index');
            $modAction->save();
        }

        // removing setting with old name
        $setting = $modx->getObject('modSystemSetting', array('key' => 'redirector.track_alias_updates'));
        if(!empty($setting) && is_object($setting)) {
            $setting->remove();
        }

	break;
}