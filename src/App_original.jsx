import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Heart, Apple, Droplets, Activity, Moon, Calendar, User, Target, Clock, FileText } from 'lucide-react'
import headerDesign from './assets/header_design.png'
import nutritionIcons from './assets/nutrition_icons.png'
import './App.css'

function App() {
  const [clientData, setClientData] = useState({
    nome: '',
    idade: '',
    altura: '',
    peso: '',
    objetivos: '',
    historico: '',
    atividade: '',
    preferencias: '',
    naoConsome: '',
    rotina: ''
  })

  const [currentWeek, setCurrentWeek] = useState(1)

  const handleInputChange = (field, value) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const mealPlan = {
    1: {
      'Segunda-feira': {
        'Café da Manhã': 'Ovos mexidos com vegetais + 1 fatia de pão integral + fruta',
        'Lanche Manhã': 'Fruta + punhado de castanhas',
        'Almoço': 'Proteína magra (frango/peixe) + arroz integral + legumes e verduras',
        'Lanche Tarde': 'Iogurte natural',
        'Jantar': 'Salada completa com leguminosas + proteína',
        'Ceia': 'Chá de camomila'
      },
      'Terça-feira': {
        'Café da Manhã': 'Iogurte natural com granola sem açúcar e frutas vermelhas',
        'Lanche Manhã': 'Cenouras baby com homus',
        'Almoço': 'Salmão grelhado + quinoa + brócolis refogado',
        'Lanche Tarde': 'Fruta + amêndoas',
        'Jantar': 'Sopa de legumes com frango desfiado',
        'Ceia': 'Fruta pequena'
      },
      'Quarta-feira': {
        'Café da Manhã': 'Vitamina de frutas com whey protein e aveia',
        'Lanche Manhã': 'Iogurte natural',
        'Almoço': 'Peito de frango + batata doce + salada verde',
        'Lanche Tarde': 'Mix de oleaginosas',
        'Jantar': 'Peixe assado + legumes no vapor',
        'Ceia': 'Chá relaxante'
      },
      'Quinta-feira': {
        'Café da Manhã': 'Tapioca com queijo branco + suco natural',
        'Lanche Manhã': 'Fruta da estação',
        'Almoço': 'Carne magra + arroz integral + feijão + salada',
        'Lanche Tarde': 'Iogurte com chia',
        'Jantar': 'Omelete de vegetais + salada',
        'Ceia': 'Leite morno'
      },
      'Sexta-feira': {
        'Café da Manhã': 'Panqueca de aveia com frutas',
        'Lanche Manhã': 'Castanhas do Brasil',
        'Almoço': 'Peixe grelhado + quinoa + vegetais refogados',
        'Lanche Tarde': 'Smoothie verde',
        'Jantar': 'Frango desfiado + salada completa',
        'Ceia': 'Chá de ervas'
      },
      'Sábado': {
        'Café da Manhã': 'Café da manhã especial (flexível)',
        'Lanche Manhã': 'Fruta + nozes',
        'Almoço': 'Refeição livre (com moderação)',
        'Lanche Tarde': 'Iogurte natural',
        'Jantar': 'Proteína + vegetais + carboidrato integral',
        'Ceia': 'Opcional'
      },
      'Domingo': {
        'Café da Manhã': 'Ovos + torrada integral + abacate',
        'Lanche Manhã': 'Fruta',
        'Almoço': 'Refeição em família (equilibrada)',
        'Lanche Tarde': 'Oleaginosas',
        'Jantar': 'Leve: sopa ou salada + proteína',
        'Ceia': 'Chá calmante'
      }
    }
  }

  const nutritionalTips = [
    {
      icon: <Apple className="w-5 h-5" />,
      title: "Frutas e Vegetais",
      description: "Consuma pelo menos 5 porções por dia para garantir vitaminas e fibras essenciais."
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      title: "Hidratação",
      description: "Beba 8-10 copos de água por dia para manter o corpo funcionando adequadamente."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Gorduras Saudáveis",
      description: "Inclua abacate, nozes e azeite para o equilíbrio hormonal e saúde cardiovascular."
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Exercícios",
      description: "Combine alimentação saudável com atividade física regular para melhores resultados."
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Sono de Qualidade",
      description: "Durma 7-9 horas por noite para regular hormônios da fome e saciedade."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Planejamento",
      description: "Dedique tempo semanal para planejar refeições e fazer compras conscientes."
    }
  ]

  const phaseNutrition = {
    "Adolescência (10-19 anos)": {
      focus: "Crescimento e desenvolvimento",
      nutrients: ["Cálcio", "Vitamina D", "Ferro", "Zinco", "Vitamina C", "Vitamina A", "Complexo B"],
      description: "Período de crescimento acelerado que requer aumento da necessidade energética e atenção especial aos micronutrientes."
    },
    "Fase Adulta (20-59 anos)": {
      focus: "Manutenção da saúde e prevenção",
      nutrients: ["Ácido Fólico", "Ferro", "Ômega-3", "Vitaminas A, C, E", "Probióticos"],
      description: "Foco na qualidade alimentar para saúde da pele, fertilidade e prevenção de doenças crônicas."
    },
    "Climatério/Pós-Menopausa (40+ anos)": {
      focus: "Prevenção de doenças crônicas",
      nutrients: ["Cálcio", "Vitamina D", "Vitamina B12", "Magnésio", "Fibras"],
      description: "Prevenção de osteoporose, doenças cardiovasculares e controle do peso corporal."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-100 to-blue-100 py-12">
        <div className="absolute inset-0 opacity-20">
          <img src={headerDesign} alt="Header Design" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            Plano Alimentar Personalizado
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Template profissional para consultoria de nutrição focada em mulheres
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cliente" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="cliente" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Cliente
            </TabsTrigger>
            <TabsTrigger value="cardapio" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Cardápio
            </TabsTrigger>
            <TabsTrigger value="nutricao" className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="fases" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Fases da Vida
            </TabsTrigger>
            <TabsTrigger value="progresso" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Progresso
            </TabsTrigger>
          </TabsList>

          {/* Aba Informações do Cliente */}
          <TabsContent value="cliente">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações do Cliente
                </CardTitle>
                <CardDescription>
                  Preencha os dados básicos para personalizar o plano alimentar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={clientData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idade">Idade</Label>
                    <Input
                      id="idade"
                      type="number"
                      value={clientData.idade}
                      onChange={(e) => handleInputChange('idade', e.target.value)}
                      placeholder="Digite a idade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input
                      id="altura"
                      type="number"
                      value={clientData.altura}
                      onChange={(e) => handleInputChange('altura', e.target.value)}
                      placeholder="Ex: 165"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso Atual (kg)</Label>
                    <Input
                      id="peso"
                      type="number"
                      value={clientData.peso}
                      onChange={(e) => handleInputChange('peso', e.target.value)}
                      placeholder="Ex: 65"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objetivos">Objetivos</Label>
                  <Textarea
                    id="objetivos"
                    value={clientData.objetivos}
                    onChange={(e) => handleInputChange('objetivos', e.target.value)}
                    placeholder="Ex: Emagrecimento, ganho de massa muscular, melhora da saúde intestinal..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="atividade">Nível de Atividade Física</Label>
                  <Select onValueChange={(value) => handleInputChange('atividade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentaria">Sedentária</SelectItem>
                      <SelectItem value="leve">Levemente ativa</SelectItem>
                      <SelectItem value="moderada">Moderadamente ativa</SelectItem>
                      <SelectItem value="intensa">Muito ativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferencias">Preferências Alimentares</Label>
                  <Textarea
                    id="preferencias"
                    value={clientData.preferencias}
                    onChange={(e) => handleInputChange('preferencias', e.target.value)}
                    placeholder="Ex: Vegetariana, vegana, sem glúten, sem lactose..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historico">Histórico de Saúde Relevante</Label>
                  <Textarea
                    id="historico"
                    value={clientData.historico}
                    onChange={(e) => handleInputChange('historico', e.target.value)}
                    placeholder="Doenças preexistentes, alergias, intolerâncias, medicamentos..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Cardápio */}
          <TabsContent value="cardapio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Cardápio Semanal - Semana {currentWeek}
                </CardTitle>
                <CardDescription>
                  Plano alimentar estruturado para a semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(mealPlan[currentWeek]).map(([day, meals]) => (
                    <Card key={day} className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{day}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {Object.entries(meals).map(([mealTime, meal]) => (
                          <div key={mealTime} className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Badge variant="outline" className="w-fit">
                              {mealTime}
                            </Badge>
                            <span className="text-sm text-gray-700">{meal}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Nutrição */}
          <TabsContent value="nutricao">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    Princípios Nutricionais
                  </CardTitle>
                  <CardDescription>
                    Diretrizes essenciais para uma alimentação equilibrada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nutritionalTips.map((tip, index) => (
                      <Card key={index} className="border-2 hover:border-green-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-full text-green-600">
                              {tip.icon}
                            </div>
                            <h3 className="font-semibold">{tip.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Macronutrientes Essenciais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Proteínas</h3>
                      <p className="text-sm text-blue-600">
                        Essenciais para construção muscular e saciedade. 
                        Fontes: carnes magras, ovos, leguminosas.
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Carboidratos</h3>
                      <p className="text-sm text-green-600">
                        Principal fonte de energia. Priorize integrais: 
                        aveia, quinoa, batata doce.
                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">Gorduras Saudáveis</h3>
                      <p className="text-sm text-orange-600">
                        Importantes para hormônios e absorção de vitaminas. 
                        Fontes: abacate, nozes, azeite.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Fases da Vida */}
          <TabsContent value="fases">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Nutrição por Fases da Vida
                </CardTitle>
                <CardDescription>
                  Necessidades nutricionais específicas para cada etapa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(phaseNutrition).map(([phase, info]) => (
                    <Card key={phase} className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <CardTitle className="text-lg">{phase}</CardTitle>
                        <CardDescription>{info.focus}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-3">{info.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {info.nutrients.map((nutrient) => (
                            <Badge key={nutrient} variant="secondary">
                              {nutrient}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Progresso */}
          <TabsContent value="progresso">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Acompanhamento e Progresso
                </CardTitle>
                <CardDescription>
                  Espaço para registrar evolução e ajustes necessários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Semana 1</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="desafios1">Desafios:</Label>
                        <Textarea id="desafios1" placeholder="Registre os principais desafios..." rows={2} />
                      </div>
                      <div>
                        <Label htmlFor="conquistas1">Conquistas:</Label>
                        <Textarea id="conquistas1" placeholder="Registre as conquistas..." rows={2} />
                      </div>
                      <div>
                        <Label htmlFor="ajustes1">Ajustes necessários:</Label>
                        <Textarea id="ajustes1" placeholder="Que ajustes são necessários..." rows={2} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Semana 2</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="desafios2">Desafios:</Label>
                        <Textarea id="desafios2" placeholder="Registre os principais desafios..." rows={2} />
                      </div>
                      <div>
                        <Label htmlFor="conquistas2">Conquistas:</Label>
                        <Textarea id="conquistas2" placeholder="Registre as conquistas..." rows={2} />
                      </div>
                      <div>
                        <Label htmlFor="ajustes2">Ajustes necessários:</Label>
                        <Textarea id="ajustes2" placeholder="Que ajustes são necessários..." rows={2} />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contato da Nutricionista</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nutri-nome">Nome:</Label>
                        <Input id="nutri-nome" placeholder="[Seu Nome]" />
                      </div>
                      <div>
                        <Label htmlFor="nutri-crn">CRN:</Label>
                        <Input id="nutri-crn" placeholder="[Seu Registro CRN]" />
                      </div>
                      <div>
                        <Label htmlFor="nutri-telefone">Telefone:</Label>
                        <Input id="nutri-telefone" placeholder="[Seu Telefone]" />
                      </div>
                      <div>
                        <Label htmlFor="nutri-email">E-mail:</Label>
                        <Input id="nutri-email" placeholder="[Seu E-mail]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Template de Plano Alimentar para Mulheres</p>
          <p className="text-green-200">
            Desenvolvido com as melhores práticas em nutrição feminina
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
