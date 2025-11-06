<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* modules/mimemail/templates/mimemail-message.html.twig */
class __TwigTemplate_d293e7bfe5d678775d87839858a9d91f extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 32
        $context["classes"] = (((($tmp = ($context["module"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ((((($tmp = ($context["key"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? (((($context["module"] ?? null) . "-") . ($context["key"] ?? null))) : (""))) : (""));
        // line 33
        yield "<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">
    <title></title>
";
        // line 38
        if ((($tmp = ($context["css"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 39
            yield "    <style type=\"text/css\">
      <!-- ";
            // line 40
            yield $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, ($context["css"] ?? null), "html", null, true);
            yield " -->
    </style>
";
        }
        // line 43
        yield "  </head>
  <body id=\"mimemail-body\"";
        // line 44
        yield $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, CoreExtension::getAttribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [($context["classes"] ?? null)], "method", false, false, true, 44), "html", null, true);
        yield ">
    <div id=\"center\">
      <div id=\"main\">
        ";
        // line 47
        yield $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(($context["body"] ?? null));
        yield "
      </div>
    </div>
  </body>
</html>
";
        $this->env->getExtension('\Drupal\Core\Template\TwigExtension')
            ->checkDeprecations($context, ["module", "key", "css", "attributes", "body"]);        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "modules/mimemail/templates/mimemail-message.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  73 => 47,  67 => 44,  64 => 43,  58 => 40,  55 => 39,  53 => 38,  46 => 33,  44 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "modules/mimemail/templates/mimemail-message.html.twig", "/home/mpo/wdttgo/www/drapi-react/provider/modules/mimemail/templates/mimemail-message.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = ["set" => 32, "if" => 38];
        static $filters = ["escape" => 40, "raw" => 47];
        static $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape', 'raw'],
                [],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
